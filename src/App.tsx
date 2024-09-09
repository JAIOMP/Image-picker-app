import React, { useMemo } from 'react';
import { locations } from '@contentful/app-sdk';
import ConfigScreen from './locations/ConfigScreen';
import Field from './locations/Field';
import EntryEditor from './locations/EntryEditor';
import Sidebar from './locations/Sidebar';
import { useSDK } from '@contentful/react-apps-toolkit';
import ImagePickerDialog from './components/ImagePicker/Dialog';

const ComponentLocationSettings = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_ENTRY_FIELD]: Field,
  [locations.LOCATION_ENTRY_EDITOR]: EntryEditor,
  [locations.LOCATION_ENTRY_SIDEBAR]: Sidebar,
  [locations.LOCATION_DIALOG]: ImagePickerDialog
};

const App = () => {
  const sdk = useSDK();

  const Component = useMemo(() => {
    for (const [location, component] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) {
        return component;
      }
    }
  }, [sdk.location]);

  return Component ? <Component sdk={sdk} /> : null;
};

export default App;
