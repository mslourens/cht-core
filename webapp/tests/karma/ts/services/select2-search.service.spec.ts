import { expect } from 'chai';
import sinon from 'sinon';
import { TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { LineageModelGeneratorService } from '@mm-services/lineage-model-generator.service';
import { SearchService } from '@mm-services/search.service';
import { Select2SearchService } from '@mm-services/select2-search.service';
import { SessionService } from '@mm-services/session.service';
import { SettingsService } from '@mm-services/settings.service';

describe('Select2SearchService', () => {
  let service: Select2SearchService;

  let sessionService;
  let settingsService;

  let selectEl;
  let val;

  beforeEach(() => {
    settingsService = {
      get: sinon.stub().resolves({})
    };
    sessionService = {
      isOnlineOnly: sinon.stub().returns(true)
    };

    val = '';
    selectEl = {
      append: sinon.stub(),
      children: sinon.stub(),
      on: sinon.stub(),
      select2: sinon.stub(),
      trigger: sinon.stub(),
      val: sinon.stub().callsFake(v => {
        if (v !== undefined) {
          val = v;
        }
        return val;
      }),
    };

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
      ],
      providers: [
        { provide: LineageModelGeneratorService, useValue: {} },
        { provide: SearchService, useValue: { } },
        { provide: SessionService, useValue: sessionService },
        { provide: SettingsService, useValue: settingsService },
      ]
    });
    service = TestBed.inject(Select2SearchService);
  });

  afterEach(() => sinon.restore());

  describe('init', () => {
    it('should set empty value when initial value is empty', async () => {
      //selectEl.children.returns({ length: 0 });
      await service.init(selectEl, [ 'person' ], {initialValue: ''});
      expect(selectEl.val.callCount).to.equal(3);
      expect(selectEl.val.args[0]).to.deep.equal([]);   // first time the component reads the current value
      expect(selectEl.val.args[1]).to.deep.equal(['']); // set the value
      expect(selectEl.val.args[2]).to.deep.equal([]);   // read the value
      expect(val).to.equal('');                         // current value ''
    });

    // TODO more tests...
  });
});
