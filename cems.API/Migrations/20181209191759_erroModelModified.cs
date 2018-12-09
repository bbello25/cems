using Microsoft.EntityFrameworkCore.Migrations;

namespace cems.API.Migrations
{
    public partial class erroModelModified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Ip",
                table: "ErrorLog",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ip",
                table: "ErrorLog");
        }
    }
}
