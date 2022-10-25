import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoService } from '../services/ingreso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-rentrada',
  templateUrl: './rentrada.component.html',
  styleUrls: ['./rentrada.component.css']
})
export class RentradaComponent implements OnInit {
  profile!: ProfileType;
  createIngreso:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  id: string | null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _ingresoService:IngresoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createIngreso = this.fb.group({
      nombre: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required],

    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
   }

  ngOnInit() {
    this.getProfile();
  }
  agregarIngreso(){
    const ingreso: any ={ //se crea el item con los datos a enviar
      nombre: this.profile.givenName,
      fecha: this.createIngreso.value.fecha,
      hora: this.createIngreso.value.hora,
    }
 
    this._ingresoService.agregarIngreso(ingreso).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Ingreso Registrado',{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/home']) // despues de agregar manda al listado general
    }).catch(error =>{
      console.log(error);
    })

  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }


}
