import { Component } from '@angular/core';
import { Menu } from './menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  entradas: Menu[] =[
    {title:'Ceviche De Pollo',price:'S/. 12.00',description:'Un toque fresco y diferente al clásico ceviche. Disfruta de la suavidad del pollo marinado en cítricos, con el toque picante que caracteriza a este plato peruano.',image:'CevichePoll.avif'},
    {title:'Croquetas de Atun',price:'S/. 12.00',description:'Crujientes por fuera, suaves por dentro. Nuestras croquetas de atún son una explosión de sabor en cada bocado.',image:'CroquetasAtun.webp'},
    {title:'Papa Rellena',price:'S/. 12.00',description:'La papa rellena más deliciosa que probarás. Rellena con carne picada y aderezada con especias, es el acompañamiento perfecto para cualquier ocasión.',image:'PapaRellena.avif'},
    {title:'Pastel De Acelga',price:'S/. 12.00',description:'Disfruta de un pastel salado diferente y saludable. Elaborado con acelga y otros ingredientes naturales, es una opción perfecta para los amantes de los vegetales.',image:'PastelAcelga.webp'},
    {title:'Sopa Criolla',price:'S/. 12.00',description:'Rescata los sabores de la cocina peruana con nuestra sopa criolla. Un caldo lleno de sabor, con verduras frescas y un toque de ají.',image:'SopaCriolla.avif'},
    {title:'Sopa De Minuta',price:'S/. 12.00',description:'Rápida de preparar y llena de sabor. Nuestra sopa de minuta es ideal para esos días en los que necesitas un plato caliente y nutritivo',image:'SopaMinuta.webp'}
  ];

  platofondos: Menu[] = [
    {title: 'Ceviche', price: 'S/ 30', description: 'Pescado fresco marinado en jugo de limón, cebolla roja, y ají, acompañado de camote y choclo.', image: 'https://trexperienceperu.com/sites/default/files/2024-05/ceviche.jpg'},
    {title: 'Lomo Saltado', price: 'S/ 35', description: 'Trozos de carne salteados con cebolla, tomate y papas fritas, servido con arroz.', image: 'https://i.ytimg.com/vi/r2oGrH__hT0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBtRrQkJyQYxpAJD7aR3yN2BhJ0Cw'},
    {title: 'Aji de Gallina', price: 'S/ 28', description: 'Pollo deshilachado en salsa de ají amarillo, acompañado de arroz y papa.', image: 'https://www.recetasnestle.com.pe/sites/default/files/srh_recipes/535186920a8b142c9d521f8e9390fedd.jpg'},
    {title: 'Seco de Cordero', price: 'S/ 40', description: 'Estofado de cordero con cilantro, servido con arroz y frejoles.', image: 'https://img-global.cpcdn.com/recipes/7b309e5f07ea5302/680x482cq70/seco-de-cordero-foto-principal.jpg'},
    {title: 'Tacu Tacu', price: 'S/ 25', description: 'Arroz y frijoles mezclados y fritos, servido con un bistec y salsa criolla.', image: 'https://comedera.com/wp-content/uploads/sites/9/2022/03/Tacu-tacu-shutterstock_1604013508.jpg'},
    {title: 'Pollo a la Brasa', price: 'S/ 32', description: 'Pollo marinado y asado, servido con papas fritas y ensalada.', image: 'https://buenapepa.pe/wp-content/uploads/2022/07/images-7.jpeg'}
  ];

  postres: Menu[] = [
    {title: 'Tres Leches', price: 'S/ 15', description: 'Pastel empapado en tres tipos de leche, suave y delicioso.', image: 'https://cdn0.recetasgratis.net/es/posts/0/1/9/torta_tres_leches_8910_orig.jpg'},
    {title: 'Suspiro a la Limeña', price: 'S/ 12', description: 'Postre de dulce de leche con merengue, un deleite para el paladar.', image: 'https://www.paulinacocina.net/wp-content/uploads/2024/05/postre-suspiro-limeno-Paulina-Cocina-Recetas-Cocina.jpg'},
    {title: 'Picarones', price: 'S/ 10', description: 'Donas de batata y zapallo, servidas con miel de chancaca.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0lWRx-ZE1tNSoVg4U0RVz1ir7CgUIHeLuCg&s'},
    {title: 'Arroz con Leche', price: 'S/ 8', description: 'Arroz cremoso con canela y pasas.', image: 'https://peopleenespanol.com/thmb/O4bAeAl5OXtRrGPmtCsHh4UpzDM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/recetas-1092-arroz-con-leche-2000-ac1485846508488e8da95f5f9c8de793.jpg'},
    {title: 'Choclo con Queso', price: 'S/ 6', description: 'Elote tierno acompañado de queso fresco.', image: 'https://buenazo.cronosmedia.glr.pe/original/2023/04/20/64417cf881b8cb4cb36c0c57.png'},
    {title: 'Helado de Lucuma', price: 'S/ 10', description: 'Helado cremoso hecho con lucuma, un sabor peruano inigualable.', image: 'https://dulcesperu.com/wp-content/uploads/2021/10/receta-helado-de-lucuma.jpg'}
  ];

  bebidas: Menu[] = [
    {title: 'Chicha Morada', price: 'S/ 8', description: 'Bebida dulce hecha de maíz morado, canela y clavos de olor.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6P1bpkgGU-ULZIQg3CwMIPuq9U4fyHAoaBQ&s'},
    {title: 'Inca Kola', price: 'S/ 6', description: 'Refresco peruano de sabor único, muy popular en Perú.', image: 'https://www.coca-cola.com/content/dam/onexp/pe/es/brands/incakola/inca-kola/productos/fiestaspatrias750.jpg'},
    {title: 'Pisco Sour', price: 'S/ 20', description: 'Cóctel clásico peruano hecho con pisco, limón, azúcar y clara de huevo.', image: 'https://notasdecata.pe/cdn/shop/articles/Pisco_sour_2_1600x.jpg?v=1686223097'},
    {title: 'Cerveza Cusqueña', price: 'S/ 10', description: 'Cerveza peruana de sabor suave y refrescante.', image: 'https://www.cusquena.com/sites/g/files/seuoyk771/files/2023-04/variedaeds.png.webp'},
    {title: 'Jugo de Maracuyá', price: 'S/ 8', description: 'Jugo natural refrescante de fruta de la pasión.', image: 'https://agraria.pe/imgs/a/lx/exportaciones-peruanas-de-jugo-de-maracuya-suman-us-44-millo-33531.jpg'},
    {title: 'Agua Mineral', price: 'S/ 5', description: 'Agua mineral con o sin gas.', image: 'https://socialdrinks.pe/wp-content/uploads/2023/05/1088_cielo-2.5l-1.jpg'}
  ];

  adicionales: Menu[] = [
    {title: 'Papa a la Huancaina', price: 'S/ 12', description: 'Papas hervidas cubiertas con salsa de ají amarillo y queso.', image: 'https://i.blogs.es/ad7abb/papas_a_la_huancaina/450_1000.jpeg'},
    {title: 'Salsa Criolla', price: 'S/ 5', description: 'Mezcla de cebolla, limón y ají, ideal para acompañar.', image: 'https://imag.bonviveur.com/salsa-criolla-basica.jpg'},
    {title: 'Arroz Blanco', price: 'S/ 5', description: 'Arroz cocido al vapor, perfecto acompañante.', image: 'https://www.recetasnestle.com.do/sites/default/files/srh_recipes/6a98b4c32d678925047bf495f5731d23.jpg'},
    {title: 'Yuca Frita', price: 'S/ 10', description: 'Yuca frita crujiente, excelente para compartir.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTakD1BG4Z8Jk9ixqtRvyBqdAv6hl218GxNnQ&s'},
    {title: 'Tortilla de Verduras', price: 'S/ 8', description: 'Tortilla hecha con vegetales frescos, un toque saludable.', image: 'https://www.gourmet.cl/wp-content/uploads/2021/12/Tortilla.jpg'},
    {title: 'Pan con Chicharrón', price: 'S/ 15', description: 'Sándwich de cerdo frito con salsa criolla.', image: 'https://comedera.com/wp-content/uploads/sites/9/2022/07/Pan-con-chicharron-limeno-shutterstock_1842217396.jpg'}
  ];

  principalMenu: string = 'entradas';

  mostrarMenu(menu: string ){
    this.principalMenu = menu;
  }
  

}
