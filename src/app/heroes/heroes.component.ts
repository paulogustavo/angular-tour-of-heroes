import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe(data => this.heroes = data);
  }

  add(name: string): void {
    name = name.trim();
    if(!name){ return; }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  deleteHero(hero: Hero){
    this.heroService.deleteHero(hero)
      .subscribe(h => {
        this.heroes = this.heroes.filter(hr => hr.id !== hero.id);
      });
  }

}
