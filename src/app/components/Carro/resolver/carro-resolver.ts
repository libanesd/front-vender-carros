import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Carro } from "../../../model/carro.model";
import { CarroService } from "../../../services/carro.service";
import { inject } from "@angular/core";

export const CarroResolver: ResolveFn<Carro> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CarroService).findById(route.paramMap.get('id')!);
    }