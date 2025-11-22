import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-culture-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './culture-detail.component.html',
  styleUrls: ['./culture-detail.component.scss']
})
export class CultureDetailComponent implements OnInit {
  plantId!: number;
  plant: any;

  // Données basées sur ton HomeComponent
  plantsData: { [key: number]: any } = {
    1: {
      id: 1,
      name: 'Salade laitue',
      emoji: '🥬',
      description: 'Plante feuillue consommée crue, très cultivée en maraîchage.',
      fullDescription: 'La salade laitue est une plante annuelle de la famille des Astéracées, cultivée pour ses feuilles tendres consommées crues en salade. Elle est appréciée pour sa fraîcheur et sa valeur nutritionnelle.',
      type: 'Légume-feuille',
      famille: 'Astéracées',
      periodePlantation: 'Toute l\'année (selon variété)',
      periodeRecolte: '6-8 semaines après plantation',
      sol: 'Sol riche en humus, frais et bien drainé',
      climat: 'Climat tempéré, supporte mal la chaleur intense',
      arrosage: 'Régulier pour maintenir le sol frais',
      entretien: 'Désherbage, paillage pour conserver l\'humidité',
      maladies: 'Mildiou, pourriture du collet, pucerons',
      avantages: 'Croissance rapide, multiple récoltes possibles',
      conseils: [
        'Planter en sol bien préparé et riche',
        'Espacer les plants de 25-30 cm',
        'Récolter le matin pour plus de fraîcheur',
        'Arroser au pied sans mouiller les feuilles'
      ]
    },
    2: {
      id: 2,
      name: 'Tomate',
      emoji: '🍅',
      description: 'Fruit-légume très populaire, riche en vitamines et facile à cultiver.',
      fullDescription: 'La tomate est une plante de la famille des Solanacées, cultivée pour ses fruits charnus riches en lycopène et vitamines. Elle existe en de nombreuses variétés adaptées à différents usages.',
      type: 'Fruit-légume',
      famille: 'Solanacées',
      periodePlantation: 'Printemps après les gelées',
      periodeRecolte: 'Été jusqu\'aux premières gelées',
      sol: 'Sol profond, riche, bien drainé',
      climat: 'Climat chaud et ensoleillé',
      arrosage: 'Régulier sans excès, éviter l\'humidité sur les feuilles',
      entretien: 'Tuteurage, taille des gourmands, fertilisation',
      maladies: 'Mildiou, oïdium, alternariose',
      avantages: 'Productivité élevée, nombreuses variétés',
      conseils: [
        'Planter en exposition très ensoleillée',
        'Tuteurer dès la plantation',
        'Supprimer les gourmands régulièrement',
        'Pratiquer la rotation des cultures'
      ]
    },
    3: {
      id: 3,
      name: 'Maïs',
      emoji: '🌽',
      description: 'Céréale polyvalente, cultivée pour l\'alimentation humaine et animale.',
      fullDescription: 'Le maïs est une céréale de la famille des Poacées, originaire d\'Amérique. Il est cultivé pour ses grains utilisés dans l\'alimentation humaine, animale et dans l\'industrie.',
      type: 'Céréale',
      famille: 'Poacées',
      periodePlantation: 'Printemps (quand le sol est réchauffé)',
      periodeRecolte: 'Été, 3-4 mois après plantation',
      sol: 'Sol profond, riche, bien drainé',
      climat: 'Climat chaud avec bonne luminosité',
      arrosage: 'Modéré, important pendant la floraison',
      entretien: 'Désherbage, buttage, fertilisation azotée',
      maladies: 'Pyrale, charbon, rouille',
      avantages: 'Rendement élevé, multiples utilisations',
      conseils: [
        'Planter en blocs pour une bonne pollinisation',
        'Espacement : 70-80 cm entre les rangs',
        'Butter les pieds pour renforcer l\'enracinement',
        'Récolter quand les grains sont laiteux'
      ]
    },
    4: {
      id: 4,
      name: 'Oignon',
      emoji: '🧅',
      description: 'Légume très cultivé, utilisé dans de nombreuses recettes traditionnelles.',
      fullDescription: 'L\'oignon est une plante bulbeuse de la famille des Amaryllidacées, cultivée pour son bulbe utilisé comme condiment et légume dans de nombreuses cuisines du monde.',
      type: 'Légume-bulbe',
      famille: 'Amaryllidacées',
      periodePlantation: 'Fin d\'hiver à printemps',
      periodeRecolte: 'Été, quand les feuilles jaunissent',
      sol: 'Sol léger, sablonneux, bien drainé',
      climat: 'Climat tempéré à chaud',
      arrosage: 'Modéré, arrêter 3 semaines avant récolte',
      entretien: 'Désherbage régulier, binage',
      maladies: 'Mildiou, pourriture blanche, thrips',
      avantages: 'Bonne conservation, usage multiple',
      conseils: [
        'Planter en sol non fumé récemment',
        'Espacer les plants de 10-15 cm',
        'Arrêter l\'arrosage avant récolte',
        'Sécher au soleil après récolte'
      ]
    },
    5: {
      id: 5,
      name: 'Riz',
      emoji: '🌾',
      description: 'Céréale essentielle, cultivée dans les zones humides d\'Afrique.',
      fullDescription: 'Le riz est une céréale de la famille des Poacées, base de l\'alimentation de nombreuses populations. Il est cultivé dans les régions tropicales et subtropicales, souvent en terrain inondé.',
      type: 'Céréale',
      famille: 'Poacées',
      periodePlantation: 'Début de la saison des pluies',
      periodeRecolte: '4-6 mois après plantation',
      sol: 'Sol argileux, capable de retenir l\'eau',
      climat: 'Climat chaud et humide',
      arrosage: 'Culture inondée ou très humide',
      entretien: 'Désherbage, gestion de l\'eau',
      maladies: 'Pyriculariose, helminthosporiose',
      avantages: 'Rendement élevé, aliment de base',
      conseils: [
        'Maintenir un niveau d\'eau constant',
        'Utiliser des variétés adaptées à la région',
        'Contrôler rigoureusement les mauvaises herbes',
        'Récolter quand les grains sont jaunes'
      ]
    },
    6: {
      id: 6,
      name: 'Arachide',
      emoji: '🥜',
      description: 'Légumineuse fortement cultivée au Sénégal, riche en huile et protéines.',
      fullDescription: 'L\'arachide est une légumineuse annuelle de la famille des Fabacées, cultivée pour ses graines riches en huile et protéines. Elle améliore la fertilité du sol grâce à sa symbiose avec les bactéries fixatrices d\'azote.',
      type: 'Légumineuse',
      famille: 'Fabacées',
      periodePlantation: 'Printemps (saison des pluies)',
      periodeRecolte: '4-5 mois après plantation',
      sol: 'Sol léger, sablonneux, bien drainé',
      climat: 'Climat chaud',
      arrosage: 'Modéré, surtout pendant la floraison',
      entretien: 'Sarclage, buttage',
      maladies: 'Rouille, taches foliaires, pourriture',
      avantages: 'Enrichit le sol en azote, double usage (graines et fourrage)',
      conseils: [
        'Rotation avec céréales recommandée',
        'Buttage important pour le développement des gousses',
        'Récolter quand les feuilles jaunissent',
        'Sécher les gousses au soleil après récolte'
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.plantId = +params['id'];
      this.loadPlantDetails();
    });
  }

  loadPlantDetails() {
    this.plant = this.plantsData[this.plantId];
    
    if (!this.plant) {
      this.router.navigate(['/home']);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}