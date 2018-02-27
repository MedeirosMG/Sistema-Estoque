using Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Utils;

namespace Business
{
    public class LogicHistorico : IDisposable
    {
        public void Dispose() { }

        public List<Historico_> getListHistorico()
        {
            try
            {
                List<Historico_> temp = new List<Historico_>();
                using(DBUtils<Historico_> util = new DBUtils<Historico_>())
                {
                    temp = util.returnList("Select * from Historico order by Data DESC");
                }

                return temp;
            }catch(Exception e)
            {
                return default(List<Historico_>);
            }
        }

        public string testeConexao()
        {
            try
            {
                using (DBUtils<Historico_> util = new DBUtils<Historico_>())
                {
                    return util.testeConexao();
                }
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}