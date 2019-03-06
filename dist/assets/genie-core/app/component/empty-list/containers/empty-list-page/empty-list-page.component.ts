import { Component, OnInit, Input } from '@angular/core';

import { EmptyListMessageContent } from '../../../../model/shared.model';

@Component({
	selector: 'app-empty-list-page',
	template: `
	<app-empty-list-message
		[messageContent]="messageContent">
	<app-empty-list-message>
`
})
export class EmptyListPageComponent implements OnInit {

	@Input() messageContent?: EmptyListMessageContent;

	constructor() { }

	ngOnInit() {
		console.log('Empty Message content: ', this.messageContent);
	}

}
