class TableroDatos {
  teamName01: string = "";
  teamName02: string = "";
  percent01: number = 0;
  percent02: number = 0;
}

const tableroDatos = new TableroDatos();
tableroDatos.teamName01 = "Equipo 01";
tableroDatos.teamName02 = "Equipo 02";
tableroDatos.percent01 = 60;
tableroDatos.percent02 = 80;

console.log(tableroDatos);

class TableroDominio {
  teamName01: string;
  teamName02: string;
  percent01: number;
  percent02: number;

  constructor(
    teamName01: string,
    teamName02: string,
    percent01: number,
    percent02: number
  ) {
    if (percent01 < 0) throw "Percent01 cannot be zero";
    if (percent02 < 0) throw "Percent02 cannot be zero";

    if (
      percent01 + percent02 > 100 ||
      percent01 + percent02 === 0 ||
      percent01 + percent02 < 100
    )
      throw "Error in percent";

    if (teamName01.trim().length < 5)
      throw "TeamName01's length cannot be less than 20 characters";
    if (teamName02.trim().length < 5)
      throw "TeamName02's length cannot be less than 20 characters";

    this.teamName01 = teamName01;
    this.teamName02 = teamName02;
    this.percent01 = percent01;
    this.percent02 = percent02;
  }
}

const tableroDominio = new TableroDominio("Equipo 01", "Equipo 02", 60, 40);
console.log(tableroDominio);
