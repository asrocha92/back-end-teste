import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductsService {

    sequealizer_id = 3;
    list_prod = [
        {
            id: 1,
            name: "Livro",
            price: 250.00
        },
        {
            id: 2,
            name: "Caneta",
            price: 150.00
        },
        {
            id: 3,
            name: "Lápis",
            price: 100.00
        },
    ];

    cadastrar(product) {
        //console.log(product);
        if (!product) {
            return {error: true, message: "Informar dados do produto!"};
        }
        if (!product.name) {
            return {error: true, message: "Informar name!"};
        }
        if (!product.price || typeof (product.price) !== 'number' || isNaN(product.price)) {
            return {error: true, message: "Informar price!"};
        }
        product.id = this.sequealizer_id = this.sequealizer_id + 1;
        this.list_prod.push(product);
        return {success: true, message: "Produto cadastrado com sucesso!", product: product };
    }

    editar(product) {
        if (!product) {
            return {error: true, message: "Não existe produto a ser editado."};
        }
        if (!product.name) {
            return {error: true, message: "Informar name!"};
        }
        if (!product.price || typeof (product.price) !== 'number' || isNaN(product.price)) {
            return {error: true, message: "Informar price!"};
        }
        let productEdit = this.getObjList(product.id);
        if (!productEdit) {
            return {error: true, message: "Produto não possui referência (ID)."};
        }
        this.list_prod[this.getPositionObjList(product.id)] = product;
        return { success: true, message: "Produto alterado com sucesso!" };
    }

    consultar(id: number) {
        return {success: true, product: ( this.getObjList(id) ?? null )};
    }

    listar() {
        return {success: true, lista: this.list_prod};
    }

    excluir(id: number) {
        let product = this.getObjList(id);
        if (!product) {
            return {error: true, message: "Não existe product, com este ID."};
        }
        let postionObj = this.getPositionObjList(id);
        this.list_prod = this.list_prod.filter((obj, index)=>{
            return index !== postionObj;
        });
        return { success: true, message: "Produto excluído com sucesso!" };
    }


    private getObjList(id: number) {
        return this.list_prod.filter((obj) => {return 'id' in obj && typeof (obj.id) === 'number' && !isNaN(obj.id) && obj.id == id})[0];
    }

    private getPositionObjList(id: number) {
        return this.list_prod.indexOf(this.getObjList(id));
    }

}
