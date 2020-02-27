import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionEditService {

	// I absolutely hate that I have to create this service, but it seems the cleanest, if not the most verbose way
	//  of doing it.

	// My goal is to pass in the lineItemId and LevelNumber to the Question Edit page.

	// Other than a service, there is no way to do that. I would LOVE if I could just 
	//
	//   this._router.navigate([{ url: '/question-edit', func: () => { return lineItemIdAndLevel; }}])
	//
	// but alas, it seems I need to write an entire fucking service to do that.
  
	func = undefined;

	constructor() { 

	}

	setSetupFunc(func) {
		this.func = func;
	}

	getSetupFunc() {
		if (this.func)
			return this.func
		else
			return () => { return undefined; };
	}

	reset() {
		this.func = undefined;
	}
}
