import {describe,it,expect} from 'vitest';
import {educationalProfiles,profileGroups,resolveEducationalProfile} from '@/lib/profile-navigation';
import {pages} from '@/lib/educalex-sitemap';
describe('Menús por perfil educativo',()=>{
 it('mantiene cinco perfiles educativos sin ofrecer administrador',()=>{expect(educationalProfiles.map(p=>p.code)).toEqual(['ingreso-docente','ascenso-reubicacion','coordinador','rector','directivo']);expect(resolveEducationalProfile('admin')).toBe(null);});
 for(const p of educationalProfiles)it(`${p.code} solo recomienda su simulacro y destinos existentes`,()=>{const links=profileGroups(p.code).flatMap(g=>g.links);for(const link of links)expect(pages[link.to],link.to).toBeDefined();const exams=links.filter(l=>l.to.startsWith('/simulacros/'));expect(exams.map(l=>l.to)).toEqual(p.code==='directivo'?[]:[`/simulacros/${p.code}`]);});
 it('no interpreta un perfil desconocido como permisos',()=>{expect(resolveEducationalProfile('')).toBe(null);expect(resolveEducationalProfile({role:'admin'})).toBe(null);});
});