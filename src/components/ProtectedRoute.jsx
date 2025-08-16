import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../supabaseConnection'; 
import { get_data_from_Supabase } from './Db_query';

export default function ProtectedRoute({ refetchData, setrefetchData, setTask_Data, children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        setrefetchData(prev => prev+1)
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  

  useEffect(()=>{
    if(!authenticated) return

    async function fetchData(){
      const data = await get_data_from_Supabase()
      setTask_Data(data || [])
    }
    fetchData()

  },[refetchData])


  if (loading) return <div>Loading...</div>;

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
