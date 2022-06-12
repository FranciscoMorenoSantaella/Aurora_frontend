import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSegment } from '@ionic/angular';
import { Client } from 'src/app/model/Client';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { StorageService } from 'src/app/services/storage.service';
import { Shoppingcart } from 'src/app/model/ShoppingCart';
import { AlertserviceService } from 'src/app/services/alertservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild('segment') segment: IonSegment;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  page: number = 0;
  productlist: Product[];
  urllist: Promise<String[]>;
  imagelist: Image[];
  image: Image;
  dir = 'https://aurora-heroka.herokuapp.com/image/files/';
  segmentaux: String;
  client: Client;
  a: ShoppingcartService;
  badge: any;
  formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  formatbalance: string;

  constructor(
    private productservice: ProductService,
    private router: Router,
    private storage: StorageService,
    private imageservice: ImageService,
    private loadingservice: LoadingService,
    private orderservice: OrderService,
    private shoppingcartservice: ShoppingcartService,
    private alertservice: AlertserviceService
  ) {}

  async ngOnInit() {}

  /**
   * Metodo que se carga al entrar en la vista este metodo nos presenta un loading nos pone en la pagina 0
   * para traer los primeros productos y mira en que categoria de productos esta, segun en la categoria en la que este
   * nos traera unos productos o otros, llamamos al metodo para cargar las imagenes cargamos al cliente actual y calculamos el numero de productos diferentes que
   * tiene en el carro para mostrarlo en el numero del icono del carrito
   */
  async ionViewDidEnter() {
    await this.loadingservice.presentLoading();
    this.page = 0;
    if (!this.segment.value || this.segment.value == 'todos') {
      this.productlist = await this.productservice.getProductsByPage(
        this.page,
        10
      );
    } else if (this.segment.value == 'anillos') {
      this.productlist = await this.productservice.getRingProductsByPage(
        this.page,
        10
      );
    } else if (this.segment.value == 'collares') {
      this.productlist = await this.productservice.getnecklaceProductsByPage(
        this.page,
        10
      );
    }
    await this.getImgByProductId();

    this.client = await this.storage.get('client');
    await this.calculateBadge();
    await this.loadingservice.dismissing();
  }

  async getProducts() {
    this.productlist = await this.productservice.getProductsByPage(
      this.page,
      10
    );
  }

  /**
   * Metodo que carga las imagenes de la lista de productos pasandole la id de cada producto
   */
  async getImgByProductId() {
    
    for (let i: number = 0; this.productlist.length > i; i++) {
      this.image = await this.imageservice.getImgByProductId(
        this.productlist[i].id
      );

      this.productlist[i].url = this.dir + this.image.uniquename;
      console.log(this.productlist[i]);
    }
    console.log(this.productlist[0].url);
  }

  async goToProduct(product: Product) {
    this.storage.set('product', product);
    this.router.navigate(['product']);
  }

  /**
   * Metodo que detecta cuando cambia el ion-segment y gracias a esto podemos ver si queremos buscar collares, anillos o una lista todos los productos
   * @param $event es el evento que detecta que ha cambiado el valor de ion-segment, al cambiar de categoria ponemos el contenido en la parte de arriba, le ponemos
   * la pagina 0 para que empiece a cargar desde el primer producto  llamamos a la funcion de cargar los productos con su categoria o todos y cargamos sus imagenes
   */
  async segmentChanged($event) {
    this.loadingservice.presentLoading();
    if (this.segment.value == 'todos') {
      this.page = 0;
      this.slideTop();
      this.productlist = await this.productservice.getProductsByPage(
        this.page,
        10
      );
      this.getImgByProductId();
    } else if (this.segment.value == 'anillos') {
      this.page = 0;
      this.slideTop();
      this.productlist = await this.productservice.getRingProductsByPage(
        this.page,
        10
      );
      this.getImgByProductId();
    } else if (this.segment.value == 'collares') {
      this.page = 0;
      this.slideTop();
      this.productlist = await this.productservice.getnecklaceProductsByPage(
        this.page,
        10
      );
      this.getImgByProductId();
    }
    this.loadingservice.dismissing();
  }

  /**
   * Metodo que sirve para poner el scroll que hayamos hecho en la pantalla arriba del todo de nuevo (como cuando entras a la pantalla originalmente)
   */
  slideTop() {
    this.content.scrollToTop(0);
  }

  /**
   * Metodo que nos cambia a la pantalla shoppingcart
   */
  goToShoppingCart() {
    this.router.navigate(['shoppingcart']);
  }

  /**
   * Metodo encargado de cargar el numero de productos diferentes que tenemos en el carrito para mostrarlo en el icono del carrito en un ion-badge
   *
   */
  async calculateBadge() {
    let shoopingcartid: number =
      await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(
        this.client.id
      );
    this.badge = (
      await this.orderservice.getOrderByShoppingCartId(shoopingcartid)
    ).length;
  }

  /**
   * Metodo para cuando llegamos al final de la pagina que ocurra una accion, en este caso sera que cargue mas productos (si es que los hay) sumando una pagina cada vez que llegamos al final y llamamos
   * al metodo para concatenar la lista nueva de productos cargados con la que ya teniamos
   * @param $event el evento es cuando detecta que hemos llegado al final de la pagina
   */
  public async loadInfinite($event) {
    this.page = this.page + 1;
    if (!this.segment.value || this.segment.value == 'todos') {
      let newProducts: Product[] = await this.productservice.getProductsByPage(
        this.page,
        10
      );

      this.concatlist(newProducts, $event);
    } else if (this.segment.value == 'anillos') {
      let newProducts: any = await this.productservice.getRingProductsByPage(
        this.page,
        10
      );
      this.concatlist(newProducts, $event);
    } else if (this.segment.value == 'collares') {
      let newProducts: any =
        await this.productservice.getnecklaceProductsByPage(this.page, 10);
      this.concatlist(newProducts, $event);
    } else {
      this.alertservice.presentAlert(
        'Error al cargar los productos',
        'Error en la carga'
      );
    }
  }

  /**
   * Metodo que une a la lista que tenemos cargada de antes con la nueva lista que le pasamos si el tamaño de la nueva lista es 0 se resta una pagina esto para que no nos
   * añada productos que ya se estaban mostrando y no carguen productos infinitos
   * @param list es la que queremos pasarle por parametro para que se concatene con la anterio
   * @param $event este evento no se si es necesario pasarselo para que funcione el metodo
   */
  public concatlist(list: any, $event) {
    if (list.length == 0) {
      this.page = this.page - 1;
    }

    this.productlist = this.productlist.concat(list);
    this.getImgByProductId();
    $event.target.complete();
  }

  /**
   * Metodo para buscar un producto por su nombre
   * @param $event detecta cuando el texto cambia
   */
  public async searchClub($event) {
    const texto = $event.target.value;
    if (texto.length > 0) {
      this.productlist = this.productlist.filter((product) => {
        return product.name.toLowerCase().indexOf(texto.toLowerCase()) > -1;
      });

   
    }else{
      await this.loadingservice.presentLoading();
      this.page = 0;
      if (!this.segment.value || this.segment.value == 'todos') {
        this.productlist = await this.productservice.getProductsByPage(this.page,10);
      } else if (this.segment.value == 'anillos') {
        this.productlist = await this.productservice.getRingProductsByPage(this.page, 10);
      } else if (this.segment.value == 'collares') {
        this.productlist = await this.productservice.getnecklaceProductsByPage(this.page, 10);
      }
      await this.getImgByProductId();
      await this.loadingservice.dismissing();
    }

    }
    
    /**
     * Recarga la pagina
     * @param event detecta cuando se hace la accion de recarga la pagina
     */
    async doRefresh(event) {
      await this.loadingservice.presentLoading();
      this.ionViewDidEnter();
      await this.loadingservice.dismissing();
      event.target.complete();
    }
    
  }

