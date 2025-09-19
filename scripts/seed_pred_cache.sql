insert into pred_cache (pk, sk, p50, lo, hi, valid_until)
values
('season#2025#week#1','player#1',10.2,7.0,14.1, now()+interval '1 day'),
('season#2025#week#1','player#2',8.6,5.5,12.3, now()+interval '1 day')
on conflict (pk, sk) do update set p50=excluded.p50, lo=excluded.lo, hi=excluded.hi, valid_until=excluded.valid_until;
