import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components' 
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
    components:{
        ...components,
        ...labsComponents
    },
    directives,
    locale:{
        locale:'pt'
    },
    theme:{
        defaultTheme:'light'
    }
})


export default vuetify;