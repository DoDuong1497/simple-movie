import{c as r,b as l,j as e,t as d,B as m}from"./index.f1371b3d.js";const h=({item:t})=>{const{title:a,vote_average:s,release_date:c,poster_path:o,id:i}=t,n=r();return l("div",{className:"movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none",children:[e("img",{src:d.image500(o),alt:"",className:"w-full h-[250px] object-cover rounded-lg mb-5"}),l("div",{className:"flex flex-col flex-1",children:[e("h3",{className:"text-xl font-bold mb-3",children:a}),l("div",{className:"flex items-center justify-between text-sm opacity-50 mb-10",children:[e("span",{children:new Date(c).getFullYear()}),e("span",{children:s})]}),e(m,{full:!0,bgColor:"secondary",onClick:()=>n(`/movie/${i}`),children:"Watch now"})]})]})};export{h as M};