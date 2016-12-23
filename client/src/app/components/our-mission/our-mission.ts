import {Component} from "@angular/core";

@Component({
  selector: 'our-mission',
  styleUrls: ['../../gunny-styles.scss', 'our-mission.scss'],
  template: `
<div class="container">
  <div class="row">
    <div class="image-container">
      <img
        class="animate-show" [fadeIn]
        src="assets/images/leepic_border_fuzzy2.jpg" alt="Lee Harkins"
        title="Lee's Portrait"/>
    </div>
  </div>

  <div class="row margin-top-lg">
    <div class="font-size-md primary-mission">
      <b>Our Primary Mission:</b><br/>
      To offer person to person help and needed emotional and practical support to cancer
      patients and their families who are facing the crisis of diagnosis and treatment of cancer.
    </div>
  </div>
</div>
`
})
export class OurMissionComponent {
}
