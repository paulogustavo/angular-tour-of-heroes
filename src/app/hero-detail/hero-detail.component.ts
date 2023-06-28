import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(){
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(h => this.hero = h);
  }

  goBack() {
    this.location.back();
  }

  save(){
    if(this.hero){
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }

}
