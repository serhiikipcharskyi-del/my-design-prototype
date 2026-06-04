declare module '*.svg' {
  import React from 'react'
  const component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default component
}
