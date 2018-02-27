using Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaEstoque.Controllers
{
    public class HistoricoController : Controller
    {
        // GET: Historico
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getListHistorico()
        {
            using(LogicHistorico logic = new LogicHistorico())
            {
                return Json(logic.getListHistorico(), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult testeConexao()
        {
            using(LogicHistorico logic = new LogicHistorico())
            {
                return Json(logic.testeConexao(), JsonRequestBehavior.AllowGet);
            }
        }
    }
}