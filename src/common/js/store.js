export function saveToLocal(id, key, val) {
  let seller = localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
    seller[id][key] = val;
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  localStorage._seller_ = JSON.stringify(seller);
}
export function loadFromLocal(id, key, def) {}
