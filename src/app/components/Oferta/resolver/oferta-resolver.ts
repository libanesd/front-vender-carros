import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Oferta } from "../../../model/oferta.model";
import { OfertaService } from "../../../services/oferta.service";
import { inject } from "@angular/core";

export const OfertaResolver: ResolveFn<Oferta> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(OfertaService).findById(route.paramMap.get('id')!);
    }