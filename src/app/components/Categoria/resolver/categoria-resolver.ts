import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Categoria } from "../../../model/categoria.model";
import { CategoriaService } from "../../../services/categoria.service";
import { inject } from "@angular/core";

export const CategoriaResolver: ResolveFn<Categoria> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CategoriaService).findById(route.paramMap.get('id')!);
    }