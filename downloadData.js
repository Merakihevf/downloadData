import * as XLSX from 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js';
import FeatureLayer from 'https://js.arcgis.com/4.19/esri/layers/FeatureLayer.js';

async function fetchAndDownloadData() {
  const featureLayer = new FeatureLayer({
    url: 'https://services6.arcgis.com/uEViOZnjj4wj8FP7/arcgis/rest/services/Road_Kilimani/FeatureServer'
  });

  const query = featureLayer.createQuery();
  query.returnGeometry = true;
  query.outFields = ['*'];

  const results = await featureLayer.queryFeatures(query);
  const data = results.features.map(feature => feature.attributes);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, 'data.xlsx');
}

window.fetchAndDownloadData = fetchAndDownloadData;
