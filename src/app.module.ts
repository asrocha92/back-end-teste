import { Module } from '@nestjs/common';
import { ProductsModule } from './modulos/products/products.module';
import { OrdersModule } from './modulos/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule]
})
export class AppModule {}
