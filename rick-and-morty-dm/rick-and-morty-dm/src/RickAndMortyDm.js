import { LitElement } from 'lit-element';
import {BbvaCoreGenericDp} from "@bbva-web-components/bbva-core-generic-dp";



export class RickAndMortyDm extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      host: {
        type: String,
      },path: {
        type: String
      },method: {
        type: String
      },
      
    };
  }

  constructor() {
    super();
    this.host = 'https://rickandmortyapi.com/api';
    this.path = 'character';
    this.method = 'GET';
  }

  _getDpService(params){
    return new BbvaCoreGenericDp(params);
  }

  async getCharacters(){
    this.genericDp = this._getDpService({ //aca tenemos la instancia del componente hijo que importamos (el DP)
      host: this.host,
      path: this.path,
      method: this.method,
    });
      try{
      this._fireEvent('request-api-success', await this.genericDp.generateRequest());
    } catch(e) {
      this._fireEvent('request-api-error', e);
    }
  }

  _fireEvent(eventName, detail)
  {
    this.dispatchEvent(new CustomEvent(eventName, {bubbles:true, detail: detail}));
    console.log(detail);
  }

}
