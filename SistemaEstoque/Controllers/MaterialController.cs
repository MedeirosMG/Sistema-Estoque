using Business;
using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaEstoque.Controllers
{
    public class MaterialController : Controller
    {
        [HttpPost] //Insere produto
        public JsonResult insereProduto(Produtos_ produto)
        {
            using(LogicProduto prod = new LogicProduto())
            {
                return Json(prod.insereProduto(produto), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]//Retorna modelo de produto
        public JsonResult getModelProduto()
        {
            return Json(new Produtos_(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet] //Retorna lista com todos os materiais
        public JsonResult getMateriais()
        {
            using(LogicProduto prod = new LogicProduto())
            {
                return Json(prod.returnProdutos(), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult deletarMaterial(int Id)
        {
            using(LogicProduto prod = new LogicProduto())
            {
                return Json(prod.deletaProduto(Id), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult retirarMaterial(int Id, int Quantidade)
        {
            using(LogicProduto prod = new LogicProduto())
            {
                return Json(prod.retirarMaterial(Id, Quantidade), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult incluirMaterial(int Id, int Quantidade)
        {
            using(LogicProduto prod = new LogicProduto())
            {
                return Json(prod.incluirMaterial(Id, Quantidade), JsonRequestBehavior.AllowGet);
            }
        }
    }
}