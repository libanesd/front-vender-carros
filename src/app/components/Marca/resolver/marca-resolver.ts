import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Marca } from "../../../model/marca.model";
import { MarcaService } from "../../../services/marca.service";
import { inject } from "@angular/core";

export const MarcaResolver: ResolveFn<Marca> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(MarcaService).findById(route.paramMap.get('id')!);
    }