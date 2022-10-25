import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalidaService } from '../services/salida.service';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';


type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-rsalida',
  templateUrl: './rsalida.component.html',
  styleUrls: ['./rsalida.component.css']
})
export class RsalidaComponent implements OnInit {

  profile!: ProfileType;
  createSalida:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  id: string | null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _salidaService:SalidaService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createSalida = this.fb.group({
      nombre: ['',Validators.required],
      fecha: ['',Validators.required],
      hora: ['',Validators.required],

    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.getProfile();
  }
  agregarSalida(){
    const salida: any ={ //se crea el  con los datos a enviar
      nombre: this.profile.givenName,
      fecha: this.createSalida.value.fecha,
      hora: this.createSalida.value.hora,
    }
    
    this._salidaService.agregarSalida(salida).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Salida Registrada',{
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
