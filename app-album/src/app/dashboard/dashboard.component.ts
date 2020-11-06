import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  searchTerm;
  albumList;
  displayedColumns: string[] = ['id', 'albumid', 'title', 'imageUrl'];
  dataSource;
  cols;
  showLayout;
  isLoading: boolean = false;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.getAlbumData().subscribe((data) => {
      this.albumList = data;
      this.dataSource = new TableVirtualScrollDataSource(this.albumList);
      this.dataSource.filterPredicate = function (
        data,
        filter: string
      ): boolean {
        return (
          data.id.toString().toLowerCase().includes(filter) ||
          data.title.toLowerCase().includes(filter) ||
          data.albumId.toString().toLowerCase().includes(filter)
        );
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
