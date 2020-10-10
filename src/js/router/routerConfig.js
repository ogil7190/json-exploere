import { UiKitWithHeader } from 'components/ui-kit';
import { JsonExplorerContainer } from 'components/containers/jsonExplorerContainer';
import * as ROUTE_PATHS from 'constants/route-paths';

export const Routes = {
    ROOT: {
        path: ROUTE_PATHS.ROOT,
        exact: true,
        data: {},
        component: JsonExplorerContainer
    }
};

export const TemporaryRoutes = {
    UI_KIT: {
        path: ROUTE_PATHS.UI_KIT,
        exact: true,
        data: {},
        component: UiKitWithHeader
    }
};
