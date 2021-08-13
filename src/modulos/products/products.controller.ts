import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Post()
    cadastrar(@Body() produto) {
        return this.productService.cadastrar(produto);
    }

    @Put()
    editar(@Body() produto) {
        return this.productService.editar(produto);
    }

    @Get(":id")
    consultar(@Param('id') id: string) {
        return this.productService.consultar(+id);
    }

    @Get()
    listar() {
        return this.productService.listar();
    }

    @Delete(":id")
    excluir(@Param('id') id: string) {
        return this.productService.excluir(+id);
    }

}
