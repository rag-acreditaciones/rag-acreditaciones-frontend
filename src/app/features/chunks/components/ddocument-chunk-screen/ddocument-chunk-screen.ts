import { Component } from '@angular/core';
import { DheaderDocs } from '../dheader-docs/dheader-docs';
import { DchunkList } from '../dchunk-list/dchunk-list';
import { Dpagination } from '../dpagination/dpagination';

@Component({
  selector: 'app-ddocument-chunk-screen',
  imports: [DheaderDocs, DchunkList, Dpagination],
  templateUrl: './ddocument-chunk-screen.html',
  styleUrl: './ddocument-chunk-screen.css',
})
export class DdocumentChunkScreen {}
