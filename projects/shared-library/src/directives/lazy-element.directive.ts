import {
  Directive,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { Observable, Subscription } from "rxjs";

@Directive({
  selector: "[shr-lazy-element]"
})
export class LazyElementDirective implements AfterViewInit, OnDestroy {
  /**
   * The element that is used as the viewport for checking visiblity of the target.
   * Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
   */
  @Input() root: Element = null;
  /**
   * Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).
   * The values can be percentages. This set of values serves to grow or
   * shrink each side of the root element's bounding box before computing intersections.
   * Defaults to all zeros
   */
  @Input() rootMargin = "0px";
  /**
   * Either a single number or an array of numbers which indicate at what percentage of the target's
   * visibility the observer's callback should be executed.
   * If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
   * If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1].
   * The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
   * A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
   */
  @Input() threshold: number | number[] = 1;
  /**
   * Provide an observable of type string which will fetch the path to the actual image. If you use this property
   * make sure that this directive is used on a <img> element.
   */
  @Input() imageAfterIntersection: Observable<string>;
  /**
   * Provide the path (src) to the placeholder image which will be displayed while the
   * "imageAfterIntersection" observable returns a path to actual images.
   */
  @Input() placeholderImage: string;
  /**
   * This input determines whether the intersection observer should stop looking for the intersection of target
   * with the root after the first intersetion
   */
  @Input() stopCheckingAfterFirstIntersection = true;
  /**
   * Output  of lazy element directive. This emits an event when the target element intersects with the
   * root element (or visible fram by default) and the ratio of intersection meets the provided "threshold"
   */
  @Output() public OnIntersection: EventEmitter<any> = new EventEmitter();

  @Output() public NotIntersecting: EventEmitter<any> = new EventEmitter();

  private intersectionObserver: IntersectionObserver;
  intersectionObserverOptions: IntersectionObserverInit;
  subscription: Subscription;
  /**
   * The callback is by default triggered the first time.
   * This will prevent running the callback logic when undesired first callback is triggered.
   */
  start = false;
  constructor(private element: ElementRef) {}
  ngAfterViewInit() {
    const that = this;
    // Check if place holder image is provided.
    // if provide then set the image source as place holder image.
    if (this.placeholderImage) {
      this.element.nativeElement.src = this.placeholderImage;
    }
    // Construct options for the intersection Observer.
    this.intersectionObserverOptions = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };
    // Initialize the intersection observer with call back and options
    this.intersectionObserver = new IntersectionObserver(
      entries => this.CheckforIntersections(entries),
      that.intersectionObserverOptions
    );
    // set the target for this observer.
    this.intersectionObserver.observe(this.element.nativeElement);
  }
  CheckforIntersections(entries: IntersectionObserverEntry[]) {
    const that = this;
    entries.forEach(entry => {
      if (
        !that.start &&
        entry.isIntersecting &&
        entry.intersectionRatio > 0 &&
        entry.target === that.element.nativeElement
      ) {
        // On intersection emit the event.
        that.OnIntersection.emit();
        // If the placeholder image and image observable is provide then subscribe to
        // the observable.
        if (that.placeholderImage && that.imageAfterIntersection) {
          that.subscription = that.imageAfterIntersection.subscribe(img => {
            // Set new image source after it is resolved by the observable.
            that.element.nativeElement.src = img;
          });
        }
        // If this is true, the instersection observer will be disconnected.
        if (that.stopCheckingAfterFirstIntersection) {
          that.intersectionObserver.unobserve(that.element.nativeElement);
          that.intersectionObserver.disconnect();
        }
      } else {
        // This block will be hit during first unnecessary callback.
        // This line will prevent undesired intersection event emission.
        that.start = false;
        that.NotIntersecting.emit();
      }
    });
  }
  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : () => {};
    this.intersectionObserver.unobserve(this.element.nativeElement);
    this.intersectionObserver.disconnect();
  }
}
