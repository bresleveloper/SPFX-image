import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ImageMailtoWebPart.module.scss';
import * as strings from 'ImageMailtoWebPartStrings';

export interface IImageMailtoWebPartProps {
  subject: string;
  imageSrc: string;
  description: string;
}

export default class ImageMailtoWebPart extends BaseClientSideWebPart<IImageMailtoWebPartProps> {

  public render(): void {
    /*this.domElement.innerHTML = `
      <div class="${ styles.imageMailto }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;*/
    let mailBody = `Hello \n click on the link to see image \n ` + this.properties.imageSrc
    this.domElement.innerHTML = ` 
      <a href="mailto:?subject=${escape(this.properties.subject)}&body=${mailBody}">
        <img src="${escape(this.properties.imageSrc)}">
      </a>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('subject',{ label: 'subject' }),
                PropertyPaneTextField('imageSrc',{ label: 'imageSrc' }),
              ]
            }
          ]
        }
      ]
    };
  }
}
