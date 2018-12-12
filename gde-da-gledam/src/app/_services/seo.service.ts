import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser'

@Injectable({ providedIn: 'root' })
export class SeoService {
    constructor( private meta: Meta, private title: Title ) {}

    generateTags(config) {
        config = {
            title: 'SEO GdeDaGledam Title',
            description: 'SEO Descripion',
            slug: '',
            image:'',
            ...config
        }

        this.title.setTitle( config.title + ' | ElectroVision Kragujevac'  )

        this.meta.updateTag( { name: 'twitter:card', content: 'summary' } );
        this.meta.updateTag( { name: 'twitter:site', content: 'GdeDaGledam' } );
        this.meta.updateTag( { name: 'twitter:title', content: config.title } );
        this.meta.updateTag( { name: 'twitter:description', content: config.description } );
        this.meta.updateTag( { name: 'twitter:image', content: config.image } );

        this.meta.updateTag( { property: 'og:type', content: 'summary' } );
        this.meta.updateTag( { property: 'og:site_name', content: 'GdeDaGledam' } );
        this.meta.updateTag( { property: 'og:title', content: config.title } );
        this.meta.updateTag( { property: 'og:description', content: config.description } );
        this.meta.updateTag( { property: 'og:image', content: config.image } );
        this.meta.updateTag( { property: 'og:url', content: 'http://gdedagledam.rs/' + config.slug } );
    }
}
