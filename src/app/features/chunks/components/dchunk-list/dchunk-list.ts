import { Component } from '@angular/core';
import { DchunkDetail } from '../dchunk-detail/dchunk-detail';

@Component({
  selector: 'app-dchunk-list',
  imports: [DchunkDetail],
  templateUrl: './dchunk-list.html',
  styleUrl: './dchunk-list.css',
})
export class DchunkList {}
