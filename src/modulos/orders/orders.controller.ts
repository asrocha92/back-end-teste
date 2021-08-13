import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) { }

    @Post()
    cadastrar(@Body() order) {
        return this.orderService.cadastrar(order);
    }

    @Put()
    editar(@Body() order) {
        return this.orderService.editar(order);
    }

    @Get(":id")
    consultar(@Param('id') id: string) {
        return this.orderService.consultar(+id);
    }

    @Get()
    listar() {
        return this.orderService.listar();
    }

    @Delete(":id")
    excluir(@Param('id') id: string) {
        return this.orderService.excluir(+id);
    }
}
