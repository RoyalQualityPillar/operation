import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute,Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { SessionExpireConfirmModel, SessionExpireDialogComponent } from '../toolbar/session-expire-dialog/session-expire-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../common/global-constants';
import { ToolbarService } from './toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL=environment.apiBaseURL;
  tokenTimer:any;
  result:any;
  clientLogoURL:any
  private isAuthenticated =false;
  expireInDuration:number;
  constructor(
    private http:HttpClient,
    private cookieService:CookieService,
    private route:Router,
    public dialog: MatDialog,
    private toolbarService:ToolbarService
  ) { }

  getIsAuth(){
    return this.isAuthenticated;
  }
  setIsAuth(isAuth:any){
    console.log(this.cookieService.get('isAuth'))
    if(this.cookieService.get('isAuth')=='true'){
      this.isAuthenticated = true;
    }
    
  }
  token:any;
  userId:any;
  async autoAuthUser(){
    const authInformartion = await this.getAuthData();
    if(!authInformartion){
      return
    }
    const now =new Date();
    console.log(authInformartion.expirationDate.getTime())
    console.log(now.getTime())
   // const expiresIn = authInformartion.expirationDate.getTime()-now.getTime();
     const expiresIn = GlobalConstants.expireInDuration;
    console.log(expiresIn)
    if(expiresIn >0){
      this.token =authInformartion.toekn;
      this.userId=authInformartion.userId;
      let isAuth='true';
      this.cookieService.set('isAuth',isAuth)
      this.setIsAuth(isAuth)
      this.setAuthTimer(expiresIn);

    }

  }
  // saveAuthData(token:string,expirationDate:Date,userId:string,tokenId:string){
  //      this.cookieService.set('token',token);
  //     this.cookieService.set('expiration',expirationDate.toISOString());
  //      this.cookieService.set('userId',userId);
  //      this.cookieService.set('attESHr',token);
  //      this.cookieService.set('tokenId',tokenId);
  //      this.cookieService.set('isLogin','loginSuccess');
  //      let isAuth='true';
  //      this.cookieService.set('isAuth',isAuth)
  // }
  saveAuthData(token: string, expirationDate: Date, userId: string, tokenId: string) {
    console.log('Saving expirationDate:', expirationDate.toISOString());
  
    this.cookieService.set('token', token);
    this.cookieService.set('expiration',expirationDate.toISOString());
    this.cookieService.set('userId', userId);
    this.cookieService.set('tokenId', tokenId);
    this.cookieService.set('isLogin', 'loginSuccess');
  
    const isAuth = 'true';
    this.cookieService.set('isAuth', isAuth);
  }
  
  getAuthData(){
    const token =this.cookieService.get('token');
    const expirationDate = this.cookieService.get('expiration');
    console.log(expirationDate)
    const userId = this.cookieService.get('userId');
    if(!token || !expirationDate || !userId){
      return false;
    }
    return {
      toekn:token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
  totalCount=0;
  setAuthTimer(duration:number){
    // let isConfirmDailog =false;
    // console.log(++this.totalCount)
     GlobalConstants.expireInDuration=duration;
    // console.log(this.expireInDuration)
    // console.log("Setting Timer "+duration);
    // this.tokenTimer =setTimeout(()=>{
    //   if(this.cookieService.get('isAuth')){
    //     if(!isConfirmDailog){
    //       isConfirmDailog = true;
    //   this.confirmDialog();
    //     }
    //   }
    // },duration*1000)
  }
  confirmDialog(): void {
    const message = `Your session will expire soon.`;

    const dialogData = new SessionExpireConfirmModel("Session Expire Warning", message);

    const dialogRef = this.dialog.open(SessionExpireDialogComponent, {
      minWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
      this.result = dialogResult;
      }
    });
  }
  logout(){
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.route.navigate(['./login']);
  }
  clearAuthData(){
    this.toolbarService.logout(this.cookieService.get('userId')).subscribe((data:any)=>{
      console.log(data)
    })
    this.cookieService.delete('isLogin');
    this.cookieService.delete('menuHeader');
    this.cookieService.delete('subMenu1');
    this.cookieService.delete('token')
    this.cookieService.delete('expiration')
    this.cookieService.delete('userId');
    this.cookieService.delete('isAuth');
    this.cookieService.deleteAll();
    localStorage.clear();
  }

  getAuth(userid:any,password:any){
   // console.log(userid);
    let loginURL=this.API_URL+'authenticate';
    let authData=userid+':'+password;
    let encodedAuthData=btoa(authData);
    //console.log(encodedAuthData1)
   //let test ='cnEyMDAxMDA6d2VsY29tZQ==';
  // let username1='rd200100';
   //let password1='welcome';
//let encodedAuthData=`Basic ${encodedAuthData1}`
   // console.log(authData)
   // console.log(encodedAuthData);
   // console.log(btoa(+username1+':'+password1))
   // console.log(btoa('rd200100:welcome'))
   ///// console.log(encodedAuthData)
    const httpOptions = {
      headers: new HttpHeaders({      
       // 'Authorization': encodedAuthData 
       'Content-Type':  'application/json',
       //'Authorization': 'Basic ' + btoa('rd200100:welcome')
       'Authorization': 'Basic ' + encodedAuthData
      })
    };
//this.http.get('url',httpOptions);
return this.http.post(loginURL,'',httpOptions)
}
// getAuthVerify(userId:any,password:any){
//   // console.log(userid);
//    let loginURL=this.API_URL+'admin/password-verification';
//    let authData=userId+':'+password;
//    let encodedAuthData=btoa(authData);  
//    const httpOptions = {
//      headers: new HttpHeaders({      
//       // 'Authorization': encodedAuthData 
//       'Content-Type':  'application/json',
//       //'Authorization': 'Basic ' + btoa('rd200100:welcome')
//       'Authorization': 'Basic ' + encodedAuthData
//      })
//    };
// //this.http.get('url',httpOptions);
// return this.http.post(loginURL,'',httpOptions)
// }
 getAuthVerify(userId:any,password:any){
  const queryParams = `?userId=${userId}&password=${password}`;
  let logoAPIURL=this.API_URL+"admin/password-verification"+queryParams;
     const httpOptions = {
     headers: new HttpHeaders({      
      // 'Authorization': encodedAuthData 
      'Content-Type':  'application/json',
      //'Authorization': 'Basic ' + btoa('rd200100:welcome')
      'Authorization': 'Basic ' + queryParams
     })
   };
  return this.http.post(logoAPIURL, ' ', httpOptions);
 // return this.http.get(logoAPIURL, { responseType: 'arraybuffer' });
}
changePAssword(requestBody:any){
    let changePassword=this.API_URL+"admin/changepassword";
    return this.http.post(changePassword,requestBody)
}

getLogoDetail(userId){
  const queryParams = `?userId=${userId}`;
  let logoAPIURL=this.API_URL+"gm/sp-master/getLogo"+queryParams;
  return this.http.get(logoAPIURL);
 // return this.http.get(logoAPIURL, { responseType: 'arraybuffer' });
}
forgetPasswordDetail(userId){
  const queryParams = `?userId=${userId}`;
  let logoAPIURL=this.API_URL+"admin/forgotPassword"+queryParams;
  return this.http.get(logoAPIURL);
 // return this.http.get(logoAPIURL, { responseType: 'arraybuffer' });
}

}
