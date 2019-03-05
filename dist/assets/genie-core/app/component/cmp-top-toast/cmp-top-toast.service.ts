import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class CmpTopToastService {

  toastIsShowSubject = new BehaviorSubject<boolean>(false);
  toastIsShow$ = this.toastIsShowSubject.asObservable();

  viewContainer?:ViewContainerRef;

  constructor(
    private cfResolver: ComponentFactoryResolver,
  ) { }

  // register view container
  public setViewContainerRef(viewContainerRef?:ViewContainerRef): void {
    this.viewContainer = viewContainerRef;
  }

  public createAndPresent(component:any): ComponentRef<any>{
    let componentRef:ComponentRef<any>;
    if (this.viewContainer == null) {
      throw new Error(`this.viewContainer undefined`);
    }
    
    const factory = this.cfResolver.resolveComponentFactory(component);
    componentRef = this.viewContainer.createComponent(factory, 0);
    componentRef.changeDetectorRef.detectChanges();

    // play enter animation
    this.toastIsShowSubject.next(true);
    return componentRef;
  }

  public present():void {
    // play enter animation
    this.toastIsShowSubject.next(true)
  }

  public dismiss():void {
    // play leave animation
    this.toastIsShowSubject.next(false)

    // destroy toast after leave animation
    setTimeout(() => {
      if (this.viewContainer == null) {
        throw new Error(`this.viewContainer undefined`);
      }
      this.viewContainer.remove(0)
    }, 800);
  }

  public isToastPresenting():boolean {
    return this.toastIsShowSubject.getValue()
  }

  public dismissPresentedToastAndWait():Observable<boolean> {
    // dismiss any presenting top toast prior to showing a new one (CmpTopToast only support one toast at a time)
    return Observable.create(
      (observer:any) => {
        if (this.toastIsShowSubject.getValue()) {
          this.toastIsShowSubject.next(false)
          setTimeout(() => {
            if (this.viewContainer == null) {
              throw new Error(`this.viewContainer undefined`);
            }
            this.viewContainer.remove(0)
            observer.next(true)
            observer.complete()
          }, 800)
        } else {
          observer.next(true)
          observer.complete()
        }
      }
    ) 
  } 
}
