import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
    
    sequealizer_id = 0;
    list_orders = [
    ];

    cadastrar(order) {
        //console.log(order);
        if (!order) {
            return {error: true, message: "Informar dados da ordem!"};
        }
        if (!order.listProducts || !Array.isArray(order.listProducts) || (Array.isArray(order.listProducts) && order.listProducts.length == 0)) {
            return {error: true, message: "Necessário conter produtos na ordem!"};
        }
        order.totalPrice = this.somarValorTotalDasOrdens(order.listProducts);
        order.id = this.sequealizer_id = this.sequealizer_id + 1;
        this.list_orders.push(order);
        return {success: true, message: "Ordem cadastra com sucesso!", order: order };
    }

    editar(order) {
        if (!order) {
            return {error: true, message: "Informar dados da ordem!"};
        }
        if (!order.listProducts || !Array.isArray(order.listProducts) || (Array.isArray(order.listProducts) && order.listProducts.length == 0)) {
            return {error: true, message: "Necessário conter produtos na ordem!"};
        }
        order.totalPrice = this.somarValorTotalDasOrdens(order.listProducts);
        let orderEdit = this.getObjList(order.id);
        if (!orderEdit) {
            return {error: true, message: "Ordem não possui referência (ID)."};
        }
        this.list_orders[this.getPositionObjList(order.id)] = order;
        return { success: true, message: "Ordem alterada com sucesso!", order: order };
    }

    consultar(id: number) {
        return {success: true, order: ( this.getObjList(id) ?? null)  };
    }

    listar() {
        return {success: true, lista: this.list_orders };
    }

    excluir(id: number) {
        let order = this.getObjList(id);
        if (!order) {
            return {error: true, message: "Não existe order, com este ID."};
        }
        let postionObj = this.getPositionObjList(id);
        this.list_orders = this.list_orders.filter((obj, index)=>{
            return index !== postionObj;
        });
        return { success: true, message: "Ordem excluída com sucesso!" };
    }


    private getObjList(id: number) {
        return this.list_orders.filter((obj) => {return 'id' in obj && typeof (obj.id) === 'number' && !isNaN(obj.id) && obj.id == id})[0];
    }

    private getPositionObjList(id: number) {
        return this.list_orders.indexOf(this.getObjList(id));
    }

    private somarValorTotalDasOrdens (listProducts: []) {
        let valorTotal = 0.0;
        listProducts.filter((obj)=>{
            valorTotal += obj['price'];
        });
        return valorTotal;
    }

}

