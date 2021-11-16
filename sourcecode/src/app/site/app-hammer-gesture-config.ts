import {Injectable} from '@angular/core';
import {HammerGestureConfig} from '@angular/platform-browser';

@Injectable()
export class AppHammerGestureConfig extends HammerGestureConfig {
    public buildHammer(element: HTMLElement) {
        return new Hammer(element, {
            touchAction: 'pan-y',
        });
    }
}
