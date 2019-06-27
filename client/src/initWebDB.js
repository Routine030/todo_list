import $ from 'jquery';

async function initWeb() {
  let ret;
  try {
    ret = await $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/',
      dataType: 'json',
    });
  } catch (err) {
    if (err.responseText) {
      alert(`error: ${err.responseText}`);
    } else {
      alert(`error: ${err.statusText}`);
    }
    return;
  }
  return ret;
}
export default initWeb;
