const search = document.getElementById('search');
const report = document.getElementById('report');
const resultCount = document.getElementById('result-count');
const noResult = document.getElementById('no-result');
const buttons = [...document.querySelectorAll('.toc-btn')];

const originalHTML = report.innerHTML;

function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function searchReport(){
  const q = search.value.trim();
  report.innerHTML = originalHTML;
  if(!q){
    resultCount.textContent = '';
    noResult.hidden = true;
    return;
  }
  const re = new RegExp(escapeRegExp(q), 'gi');
  let count = 0;
  report.querySelectorAll('p, h1, h2').forEach(el => {
    if(re.test(el.textContent)){
      count++;
      re.lastIndex = 0;
      el.innerHTML = el.innerHTML.replace(re, m => `<mark>${m}</mark>`);
    }
    re.lastIndex = 0;
  });
  resultCount.textContent = `검색 결과 ${count}개`;
  noResult.hidden = count !== 0;
}

search.addEventListener('input', searchReport);

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target)?.scrollIntoView({behavior:'smooth'});
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      buttons.forEach(b => b.classList.toggle('active', b.dataset.target === entry.target.id));
    }
  });
},{rootMargin:'-15% 0px -70% 0px'});
document.querySelectorAll('article h2').forEach(h => observer.observe(h));

document.getElementById('top-btn').addEventListener('click', () =>
  window.scrollTo({top:0, behavior:'smooth'})
);
