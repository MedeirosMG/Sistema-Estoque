using System.Web;
using System.Web.Optimization;

namespace SistemaEstoque
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                    "~/Scripts/bootstrap.js",
                    "~/Scripts/respond.js",
                    "~/Scripts/angular.js",
                    "~/Scripts/Lib/AngularGlobal.js",
                    "~/Scripts/Lib/Historico.js",
                    "~/Scripts/Lib/PaginaInicial.js",
                    "~/Scripts/Lib/CustomAlert.js",
                    "~/Scripts/Lib/Alert.js",
                    "~/Scripts/Selectpicker.js",
                    "~/Scripts/Lib/GerenciarMateriais.js",
                    "~/Scripts/Lib/Moment.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/Selectpicker.css"));
        }
    }
}
