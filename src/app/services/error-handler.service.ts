import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.status === 404) {
      errorMessage = `Not Found: İstek yapılan kaynak bulunamadı.`;
    } else if (err.status === 500) {
      errorMessage = `Internal Server Error: Sunucuda bir iç hata meydana geldi.`;
    } else if (err.error instanceof ErrorEvent) {
      errorMessage = `Bir hata oluştu: ${err.error.message}`;
    } else {
      errorMessage = `Hata Mesajı: ${err.message} | Hata Kodu: ${err.status}`;
    }

    return throwError(errorMessage);
  }
}
