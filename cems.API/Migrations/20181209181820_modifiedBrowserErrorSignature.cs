using Microsoft.EntityFrameworkCore.Migrations;

namespace cems.API.Migrations
{
    public partial class modifiedBrowserErrorSignature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Origin",
                table: "ErrorLog");

            migrationBuilder.DropColumn(
                name: "Referer",
                table: "ErrorLog");

            migrationBuilder.RenameColumn(
                name: "UserAgent",
                table: "ErrorLog",
                newName: "Headers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Headers",
                table: "ErrorLog",
                newName: "UserAgent");

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "ErrorLog",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Referer",
                table: "ErrorLog",
                nullable: true);
        }
    }
}
