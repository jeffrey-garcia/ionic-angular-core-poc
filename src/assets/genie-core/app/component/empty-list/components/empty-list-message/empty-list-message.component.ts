import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { EmptyListMessageContent } from '../../../../model/shared.model';

@Component({
	selector: 'app-empty-list-message',
	templateUrl: './empty-list-message.component.html',
	styleUrls: ['./empty-list-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyListMessageComponent implements OnInit, OnChanges {

	@Input() messageContent?: EmptyListMessageContent;

	constructor() { }

	ngOnInit() {
		console.log('Empty Message content: ', this.messageContent);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('Changes: ', changes);
	}

}
