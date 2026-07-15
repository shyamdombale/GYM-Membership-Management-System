const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
async function request(path, options={}) {
  const token=localStorage.getItem("token");
  const res=await fetch(BASE+path,{...options,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})}});
  const data=await res.json(); if(!res.ok) throw new Error(data.message||"Request failed"); return data;
}
export const api={
 login:(body)=>request("/auth/login",{method:"POST",body:JSON.stringify(body)}),
 register:(body)=>request("/auth/register",{method:"POST",body:JSON.stringify(body)}),
 members:()=>request("/members"),
 classes:()=>request("/classes"),
 book:(classId)=>request("/bookings",{method:"POST",body:JSON.stringify({classId})}),
 cancelBooking:(id)=>request(`/bookings/${id}`,{method:"DELETE"}),
 progress:()=>request("/progress"),
 addProgress:(body)=>request("/progress",{method:"POST",body:JSON.stringify(body)}),
 adminAnalytics:()=>request("/analytics"),
 attendance:(body)=>request("/attendance/checkin",{method:"POST",body:JSON.stringify(body)}),
 assignPlan:(body)=>request("/plans",{method:"POST",body:JSON.stringify(body)}),
 lockers:()=>request("/lockers"),
 pay:(body)=>request("/payments/order",{method:"POST",body:JSON.stringify(body)})
};
