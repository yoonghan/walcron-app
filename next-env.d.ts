/// <reference types="next" />
/// <reference types="next/types/global" />

import { Props } from '@fortawesome/react-fontawesome'

declare module '@fortawesome/react-fontawesome' {
    export function FontAwesomeIcon(props: Props & { width: number }): JSX.Element {}
}
