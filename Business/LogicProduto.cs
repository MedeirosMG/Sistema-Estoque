using Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Utils;

namespace Business
{
    public class LogicProduto : IDisposable
    {
        public void Dispose() { }
        
        public bool insereProduto(Produtos_ produto)
        {
            try
            {
                using (DBUtils<Produtos_> util = new DBUtils<Produtos_>())
                {
                    produto.Id = util.Insert(produto);
                    if (produto.Id == -1)
                        return false;
                }

                return true;
            }
            catch
            {
                return false;
            }
        }
        public List<Produtos_> returnProdutos()
        {
            try
            {
                using(DBUtils<Produtos_> prod = new DBUtils<Produtos_>())
                {
                    return prod.returnList("Select * from Produtos order by Nome");
                }
            }catch(Exception e)
            {
                return default(List<Produtos_>);
            }
        }
        public bool deletaProduto(int Id)
        {
            try
            {
                Produtos_ produto;
                using(DBUtils<Produtos_> util = new DBUtils<Produtos_>())
                {
                    produto = util.returnObj("Select * from Produtos where ID = " + Id.ToString());

                    return util.delete(produto);
                }
            }catch(Exception e)
            {
                return false;
            }
        }

        public bool incluirMaterial(int Id, int quantidade)
        {
            try
            {
                Produtos_ produtotemp;

                using (DBUtils<Produtos_> util = new DBUtils<Produtos_>())
                {
                    produtotemp = util.returnObj("Select * from Produtos where ID = " + Id.ToString());
                }

               
                produtotemp.Quantidade = produtotemp.Quantidade + quantidade;

                using (DBUtils<Produtos_> util = new DBUtils<Produtos_>())
                {
                    if (util.Update(produtotemp))
                    {
                        Historico_ historicoTemp = new Historico_()
                        {
                            Material = produtotemp.Nome,
                            Tipo = "Incluido",
                            Data = DateTime.Now,
                            Quantidade = quantidade
                        };

                        using (DBUtils<Historico_> util2 = new DBUtils<Historico_>())
                        {
                            historicoTemp.Id = util2.Insert(historicoTemp);

                            if (historicoTemp.Id != -1)
                                return true;
                        }
                    }
                }
                

                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool retirarMaterial(int Id, int quantidade)
        {
            try
            {
                Produtos_ produtotemp;

                using (DBUtils<Produtos_> util = new DBUtils<Produtos_>())
                {
                    produtotemp = util.returnObj("Select * from Produtos where ID = " + Id.ToString());
                }

                if(produtotemp.Quantidade - quantidade >= 0)
                {
                    produtotemp.Quantidade = produtotemp.Quantidade - quantidade;

                    using(DBUtils<Produtos_> util = new DBUtils<Produtos_>())
                    {
                        if (util.Update(produtotemp))
                        {
                            Historico_ historicoTemp = new Historico_()
                            {
                                Material = produtotemp.Nome,
                                Tipo = "Retirada",
                                Data = DateTime.Now,
                                Quantidade = quantidade
                            };

                            using(DBUtils<Historico_> util2 = new DBUtils<Historico_>())
                            {
                                historicoTemp.Id = util2.Insert(historicoTemp);

                                if (historicoTemp.Id != -1)
                                    return true;
                            }
                        }
                    }
                }

                return false;                
            }
            catch(Exception e)
            {
                return false;
            }
        }
    }
}